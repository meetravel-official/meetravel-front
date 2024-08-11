import { ChatContainer } from "./Chat/ChatContainer";
import { HomeContainer } from "./Home/HomeContainer";
import { PostContainer } from "./Post/PostContainer";
import { ProfileContainer } from "./Profile/ProfileContainer";
import { SampleContainer } from "./Sample/SampleContainer";
import { ShopContainer } from "./Shop/ShopContainer";
import { SignInContainer } from "./SignIn/SignInContainer";

export const pageRoutes = {
  ROOT: "/",
  CHAT: "/chat",
  SHOP: "/shop",
  PROFILE: "/profile",
  SIGN_IN: "auth/sign-in",
  POST: "/post",
};

export const containerRoutes = {
  SAMPLE: SampleContainer,
  HOME: HomeContainer,
  SHOP: ShopContainer,
  CHAT: ChatContainer,
  PROFILE: ProfileContainer,
  SIGN_IN: SignInContainer,
  POST: PostContainer,
};
