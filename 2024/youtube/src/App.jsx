import { Outlet } from "react-router-dom";
import SearchHeader from "./components/SearchHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <SearchHeader />
      {/* 검색헤더는 검색을 해서 해당 경로로 이동할 뿐, 네트워크 통신이 이뤄지지 않으므로,
      Outlet에다가 Provider를 지정한다. */}
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
