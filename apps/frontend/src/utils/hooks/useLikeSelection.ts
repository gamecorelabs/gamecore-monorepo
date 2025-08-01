import { useUserStore } from "@/store/userStore";
import dataApi from "@/utils/common-axios/dataApi";
import { encodeBase64Unicode } from "@/utils/helpers/base64Unicode";
import { useFingerprint } from "@/utils/hooks/useFingerprint";
import { LikeType } from "@/types/like/like.types";
import { ResourceType } from "@/types/common/resource.types";
import { useEffect, useMemo, useState } from "react";

type SelectedMap = Record<number, { type: LikeType | null }>;

export const useLikeSelection = (
  resourceType: ResourceType,
  resourceIds: number[]
) => {
  const [selectedMap, setSelectedMap] = useState<SelectedMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useUserStore((state) => state.user);
  const fp = useFingerprint();

  const fingerprint = useMemo(() => {
    if (currentUser) return "";
    return fp;
  }, [currentUser, fp]);

  const headers = useMemo(() => {
    const h: Record<string, string> = {};

    if (!currentUser && fingerprint) {
      const encoded = encodeBase64Unicode(`${fingerprint}`);
      h["Authorization"] = `Basic ${encoded}`;
    }

    return h;
  }, [currentUser, fingerprint]);

  useEffect(() => {
    const fetchLikeSelectList = async () => {
      if (!currentUser && !headers["Authorization"]) return;
      if (!resourceIds || resourceIds.length === 0) return;

      const { data } = await dataApi.post(
        `/like/selected`,
        {
          resourceType: resourceType,
          resourceIds: resourceIds,
        },
        {
          headers,
          withCredentials: true,
        }
      );

      setSelectedMap(data);
      setIsLoading(false);
    };

    fetchLikeSelectList();
  }, [resourceType, resourceIds, headers, currentUser]);

  return {
    selectedMap,
    isLoading,
  };
};
