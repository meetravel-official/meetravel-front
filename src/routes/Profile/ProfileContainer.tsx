import { css } from "@emotion/react";
import { checkUser } from "utils/check-user";
import { getUserData } from "utils/token-utils";

import { ProfileForm } from "@/components/ProfileForm/ProfileForm";

import { ProfileEditModal } from "./components/ProfileEditModal";
export const ProfileContainer = checkUser(() => {
  return (
    <div
      css={css`
        margin-top: 25%;
      `}
    >
      <ProfileForm userId={getUserData().userId} />
      <ProfileEditModal />
    </div>
  );
});
