import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  cssLayoutContentStyle,
  cssLayoutFixedFooterStyle,
  cssLayoutStyle,
} from "./Layout.styles";

const LayoutContext = createContext<{ fixedFooterHeight?: number }>({});
const useLayoutConsumer = () => {
  return useContext(LayoutContext);
};

const LayoutHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <header {...props}>{children}</header>;
};

const LayoutContent = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { fixedFooterHeight } = useLayoutConsumer();
  // 콘텐츠 내용이 fixed footer에 가려지지 않도록 패딩 추가
  return (
    <main css={cssLayoutContentStyle({ fixedFooterHeight })} {...props}>
      {children}
    </main>
  );
};

const LayoutFooter = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <footer {...props}>{children}</footer>;
};

const LayoutFixedFooter = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer className="fixed" css={cssLayoutFixedFooterStyle} {...props}>
      {children}
    </footer>
  );
};

export const Layout = ({ children }: PropsWithChildren) => {
  const [fixedFooterHeight, setFixedFooterHeight] = useState<number>();

  useEffect(() => {
    // 자동으로 fixed footer의 높이를 계산
    setFixedFooterHeight(
      window.document.querySelector("footer.fixed")?.getBoundingClientRect()
        .height
    );
  }, []);

  const layoutValue = useMemo(
    () => ({
      fixedFooterHeight: fixedFooterHeight,
    }),
    [fixedFooterHeight]
  );

  return (
    <LayoutContext.Provider value={layoutValue}>
      <div css={cssLayoutStyle}>{children}</div>
    </LayoutContext.Provider>
  );
};

Layout.Header = LayoutHeader;
Layout.Content = LayoutContent;
Layout.Footer = LayoutFooter;
Layout.FixedFooter = LayoutFixedFooter;
