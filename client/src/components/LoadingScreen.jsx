// components/LoadingScreen.tsx

import { Loader } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader className="animate-spin w-12 h-12 text-primary" />
        <p className="text-muted-foreground text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
