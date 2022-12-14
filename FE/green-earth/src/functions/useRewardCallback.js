import { useRecoilState } from "recoil";
import { rewardListState } from "./../store/atoms";
import { useNavigate } from "react-router-dom";

import { useCommonCallback } from "./useCommonCallback";

export const useRewardCallback = () => {
  const navigate = useNavigate();

  const { api } = useCommonCallback();

  const [rewardList, setRewardList] = useRecoilState(rewardListState);

  // 보상 목록 조회 콜백 함수
  const rewardListCallback = async (childId) => {
    api
      .get(`/reward/child/${childId}`)
      .then((response) => {
        if (response.data) {
          setRewardList(response.data);
          console.log("보상 정보가 조회되었습니다.");
          // console.log("rewardList :", response.data);
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  // 보상 설정 콜백 함수
  const rewardSubmitCallback = async (
    name,
    rewardCondition,
    childId,
    parentNickname
  ) => {
    // console.log(name, rewardCondition, childId, parentNickname);
    api
      .post(`/reward/child/${childId}`, {
        name: name,
        rewardCondition: rewardCondition,
        childId: childId,
        parentNickname: parentNickname,
      })
      .then((response) => {
        if (response.data) {
          console.log("보상이 등록 되었습니다.");
          // console.log("reward :", response.data);
          setRewardList(response.data);
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  // 보상 수정 콜백 함수
  const rewardEditCallback = async (
    rewardId,
    rewardName,
    rewardCondition,
    childId
  ) => {
    // console.log(rewardId, rewardName, rewardCondition, childId);
    api
      .put(`/reward/${rewardId}`, {
        rewardId: rewardId,
        rewardName: rewardName,
        rewardCondition: parseInt(rewardCondition),
        childId: childId,
      })
      .then((response) => {
        if (response.data) {
          console.log("보상이 수정 되었습니다.");
          // console.log("reward :", response.data);
          setRewardList(response.data);
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  // 보상 지급 콜백 함수
  const rewardPayCallback = async (rewardId) => {
    api
      .delete(`/reward/${rewardId}`)
      .then((response) => {
        if (response.data) {
          console.log("보상이 지급되었습니다.");
          // console.log("reward :", response.data);
          setRewardList(response.data);
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  return {
    rewardListCallback,
    rewardSubmitCallback,
    rewardEditCallback,
    rewardPayCallback,
  };
};
