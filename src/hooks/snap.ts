import { useEffect, useState } from 'react';

const useSnap = () => {
  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    const script = document.createElement('script');
    script.src = midtransScriptUrl;

    const myMidtransClientKey = 'SB-Mid-client-7EGzo4urk5DRsGt_';
    if (myMidtransClientKey) {
      script.setAttribute('data-client-key', myMidtransClientKey);
    } else {
      console.error('MIDTRANS_CLIENT_KEY is not set');
    }

    script.onload = () => {
      setSnap((window as any).snap);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token: string, embedId: string, action: { onSuccess: (result: any) => void }) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result: any) {
          console.log('success', result);
          action.onSuccess(result);
        },
      });
    }
  };
  return { snapEmbed };
};

export default useSnap;
