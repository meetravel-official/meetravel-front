import { ChatContainer } from "./Chat/ChatContainer";
import { HomeContainer } from "./Home/HomeContainer";
import { PostContainer } from "./Post/PostContainer";
import { ProfileContainer } from "./Profile/ProfileContainer";
import { SampleContainer } from "./Sample/SampleContainer";
import { ShopContainer } from "./Shop/ShopContainer";
import { SignInContainer } from "./SignIn/SignInContainer";
import { SignUpContainer } from "./SignUp/SignUpContainer";
import { TermsOfServiceContainer } from "./TermsOfService/TermsOfServiceContainer";

export const pageRoutes = {
  ROOT: "/",
  CHAT: "/chat",
  SHOP: "/shop",
  PROFILE: "/profile",
  SIGN_IN: "auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  POST: "/post",
  TOS: "/terms-of-service",
  SAMPLE: "/sample",
};

export const containerRoutes = {
  SAMPLE: SampleContainer,
  HOME: HomeContainer,
  SHOP: ShopContainer,
  CHAT: ChatContainer,
  PROFILE: ProfileContainer,
  SIGN_IN: SignInContainer,
  SIGN_UP: SignUpContainer,
  POST: PostContainer,
  TOS: TermsOfServiceContainer,
};
