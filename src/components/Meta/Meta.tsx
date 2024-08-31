import { Helmet } from "react-helmet-async";

export const Meta = () => {
  return (
    <Helmet prioritizeSeoTags>
      <title>미트래블</title>
      <meta
        property="description"
        content="여행을 하면서 새로운 인연을 매칭해주는 플랫폼 '미트래블'"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://meetravel.life" />
      <meta property="og:title" content="미트래블" />
      <meta property="og:image" content="/assets/images/og-image.png" />
      <meta
        property="og:description"
        content="여행을 하면서 새로운 인연을 매칭해주는 플랫폼 '미트래블'"
      />
      <meta property="og:site_name" content="미트래블" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="미트래블" />
      <meta
        name="twitter:description"
        content="여행을 하면서 새로운 인연을 매칭해주는 플랫폼 '미트래블'"
      />
      <meta name="twitter:image" content="/assets/images/og-twitter.png" />
    </Helmet>
  );
};
