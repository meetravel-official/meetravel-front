import { ChatContainer } from "./Chat/ChatContainer";
import ChatRoomContainer from "./ChatRoom/ChatRoomContainer";
import { HomeContainer } from "./Home/HomeContainer";
import { LikePlaceContainer } from "./LikePlace/LikePlaceContainer";
import NotFoundPage from "./NotFoundPage";
import { NotificationContainer } from "./Notification/NotificationContainer";
import { ProfileContainer } from "./Profile/ProfileContainer";
import { SearchContainer } from "./Search/SearchContainer";
import { SettingContainer } from "./Setting/SettingContainer";
import { KaKaoAuthCheckContainer } from "./SignIn/KaKaoAuthCheckContainer";
import { SignInContainer } from "./SignIn/SignInContainer";
import { SignUpContainer } from "./SignUp/SignUpContainer";
import { TravelInfoContainer } from "./TravelInfo/TravelInfoContainer";

export const pageRoutes = {
  ROOT: "/",
  SEARCH: "/search",
  CHAT: "/chat",
  PROFILE: "/profile",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  AUTH_CHECK: "/auth/sign-in/check",
  SETTING: "/setting",
  TRAVEL_INFO: "/travel-info",
  NOTFOUND: "/*",
  NOTIFICATION: "/notification",
  LIKE_PLACE: "/like-place",
};

export const containerRoutes = {
  HOME: HomeContainer,
  SEARCH: SearchContainer,
  CHAT: ChatContainer,
  CHAT_ROOM: ChatRoomContainer,
  PROFILE: ProfileContainer,
  SIGN_IN: SignInContainer,
  SETTING: SettingContainer,
  SIGN_UP: SignUpContainer,
  AUTH_CHECK: KaKaoAuthCheckContainer,
  TRAVEL_INFO: TravelInfoContainer,
  NOTFOUND: NotFoundPage,
  NOTIFICATION: NotificationContainer,
  LIKE_PLACE: LikePlaceContainer,
};
