import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TaxReport({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    const res = await fetch(`/api/tax/download?userId=${userId}`);
    const data = await res.json();
    setLoading(false);
    if (data.url) {
      setDownloadUrl(data.url);
    }
  };

  return (
    <div>
      <Button onClick={handleDownload} disabled={loading}>
        {loading ? "Generating..." : "Download 1099-K"}
      </Button>
      {downloadUrl && <a href={downloadUrl} download>Click here to download</a>}
    </div>
  );
}
