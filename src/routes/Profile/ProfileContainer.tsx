import { css } from "@emotion/react";
import { checkUser } from "utils/check-user";

import { ProfileForm } from "@/components/ProfileForm/ProfileForm";

import { ProfileEditModal } from "./components/ProfileEditModal";
export const ProfileContainer = checkUser(() => {
  return (
    <div
      css={css`
        margin-top: 25%;
      `}
    >
      <ProfileForm isMy />
      <ProfileEditModal />
    </div>
  );
});
