// 클라이언트에서 API 호출
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { BlockMap } from "notion-types";
import { CONFIG } from "@/site.config";


const Cover: React.FC = () => {
  return (
    <div className="p-6">
      {(
        <img
          src={CONFIG.page.cover}
          alt="Notion Cover"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default Cover;
