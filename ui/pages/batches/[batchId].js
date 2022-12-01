import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import GoBackButton from "../../components/GoBackButton";

export default function BatchDetails() {
  const router = useRouter();
  const { batchId } = router.query;

  const getBatch = async () => {
    try {
      const res = await api.get(`/api/v1/batch/${batchId}`);
      console.log(res.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getBatch();
  }, [router.isReady]);

  return (
    <div>
      <GoBackButton router={router} />
      <div>Batch ID: {batchId}</div>
    </div>
  );
}
