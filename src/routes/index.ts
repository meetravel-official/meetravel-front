import { ChatContainer } from "./Chat/ChatContainer";
import ChatRoomContainer from "./ChatRoom/ChatRoomContainer";
import { HomeContainer } from "./Home/HomeContainer";
import NotFoundPage from "./NotFoundPage";
import { ProfileContainer } from "./Profile/ProfileContainer";
import { SampleContainer } from "./Sample/SampleContainer";
import { SearchContainer } from "./Search/SearchContainer";
import { KaKaoAuthCheckContainer } from "./SignIn/KaKaoAuthCheckContainer";
import { SignInContainer } from "./SignIn/SignInContainer";
import { SignUpContainer } from "./SignUp/SignUpContainer";
import { TermsOfServiceContainer } from "./TermsOfService/TermsOfServiceContainer";
import { TravelInfoContainer } from "./TravelInfo/TravelInfoContainer";

export const pageRoutes = {
  ROOT: "/",
  SEARCH: "/search",
  CHAT: "/chat",
  PROFILE: "/profile",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  AUTH_CHECK: "/auth/sign-in/check",
  TRAVEL_INFO: "/travel-info",
  TOS: "/terms-of-service",
  SAMPLE: "/sample",
  NOTFOUND: "/*",
};

export const containerRoutes = {
  SAMPLE: SampleContainer,
  HOME: HomeContainer,
  SEARCH: SearchContainer,
  CHAT: ChatContainer,
  CHAT_ROOM: ChatRoomContainer,
  PROFILE: ProfileContainer,
  SIGN_IN: SignInContainer,
  SIGN_UP: SignUpContainer,
  AUTH_CHECK: KaKaoAuthCheckContainer,
  TOS: TermsOfServiceContainer,
  TRAVEL_INFO: TravelInfoContainer,
  NOTFOUND: NotFoundPage,
};
