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
  cssLayoutFixedHeaderStyle,
  cssLayoutStyle,
} from "./Layout.styles";

export interface FixedHeight {
  footer?: number;
  header?: number;
}

interface LayoutContext {
  fixedHeight?: FixedHeight;
}

const LayoutContext = createContext<LayoutContext>({});

const useLayoutConsumer = () => {
  return useContext(LayoutContext);
};

const LayoutHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header css={cssLayoutFixedHeaderStyle} {...props}>
      {children}
    </header>
  );
};

const LayoutContent = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { fixedHeight } = useLayoutConsumer();
  // 콘텐츠 내용이 헤더나 고정 푸터에 가려지지 않도록 패딩 추가
  return (
    <main css={cssLayoutContentStyle({ fixedHeight })} {...props}>
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
  const [fixedHeaderHeight, setFixedHeaderHeight] = useState<number>();
  const [fixedFooterHeight, setFixedFooterHeight] = useState<number>();

  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // 자동으로 fixed header, footer의 높이를 계산
    setFixedFooterHeight(
      window.document.querySelector("footer.fixed")?.getBoundingClientRect()
        .height
    );
    setFixedHeaderHeight(
      window.document.querySelector("header")?.getBoundingClientRect().height
    );
  }, []);

  const layoutValue = useMemo(
    () => ({
      fixedHeight: { footer: fixedFooterHeight, header: fixedHeaderHeight },
    }),
    [fixedFooterHeight, fixedHeaderHeight]
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
