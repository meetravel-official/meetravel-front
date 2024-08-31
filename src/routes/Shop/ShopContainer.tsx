import { Image, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";

export const ShopContainer = () => {
  return (
    <div>
      <Typography>샵</Typography>
      <div css={cssAlignVerticalStyle}>
        <Image
          height="100px"
          src={"https://soopool.art/image/acnh/animal/Flurry.png"}
          alt="뽀야미"
        />
        <Image
          height="200px"
          src={"https://soopool.art/image/acnh/animal/Flurry.png"}
          alt="뽀야미"
          objectFit="contain"
        />
        <Image
          width="100%"
          src={
            "https://www.10wallpaper.com/wallpaper/1366x768/1409/Cute_Little_Puppy-photography_HD_wallpaper_1366x768.jpg"
          }
          alt="뽀야미"
          draggable
        />
        <Image
          src={
            "https://png.pngtree.com/background/20230424/original/pngtree-tan-colored-puppy-stares-at-the-camera-picture-image_2463734.jpg"
          }
          alt="뽀야미"
        />
        <Image
          height="800px"
          src={
            "https://img.freepik.com/premium-photo/cute-puppy_1037680-12038.jpg"
          }
          alt="뽀야미"
        />
        <Image
          height="1000px"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvRF19IEeu5LnaMQjwa_naqUUd8vQoSDypNA&s"
          }
          alt="뽀야미"
        />
        <Image
          height="1000px"
          src={
            "https://previews.123rf.com/images/rawpixel/rawpixel1812/rawpixel181201886/113918317-%EA%B8%B8%EA%B3%A0%EC%96%91%EC%9D%B4%EC%99%80-%EB%85%B8%EB%8A%94-%EC%97%AC%EC%9E%90.jpg"
          }
          alt="뽀야미"
        />
        <Image
          height="1000px"
          src={
            "https://previews.123rf.com/images/maximusnd/maximusnd1703/maximusnd170301406/73062653-%EA%B9%8A%EC%9D%80-%EA%B3%B5%EA%B0%84-%EA%B3%A0%ED%99%94%EC%A7%88-%EC%8A%A4%ED%83%80-%ED%95%84%EB%93%9C-%EB%B0%B0%EA%B2%BD%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B3%84%EC%9D%B4-%EB%B9%9B%EB%82%98%EB%8A%94-%EC%9A%B0%EC%A3%BC-%EB%B0%B0%EA%B2%BD-%EC%A7%88%EA%B0%90%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%99%94%EB%A0%A4%ED%95%9C-%EB%B3%84%EC%9D%B4-%EB%B9%9B%EB%82%98%EB%8A%94-%EB%B0%A4-%ED%95%98%EB%8A%98-%EB%B0%94%EA%B9%A5-%EC%AA%BD.jpg"
          }
          alt="뽀야미"
        />
        <Image
          height="1000px"
          src="https://photo.coolenjoy.co.kr/data/editor/1910/Bimg_487678fc929a297aa22decbf80bbc893_avlv.jpg"
          alt="토끼"
        />
        <Image
          height="1000px"
          src="https://photo.coolenjoy.co.kr/data/editor/1910/Bimg_487678fc929a297aa22decbf80bbc893_rifl.jpg"
          alt="토끼 둘"
        />
        <Image height="1000px" src={"https://soo"} alt="뽀야미" />
      </div>
    </div>
  );
};
