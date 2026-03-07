import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [verified, setVerified] = useState(false);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (!user) {
                    router.replace('/login');
                } else {
                    setVerified(true);
                }
            });
            return () => unsubscribe();
        }, [router]);

        if (!verified) return null; // Or a loading spinner
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;