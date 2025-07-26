import React, { useEffect } from "react";
import Container from "./components/Container";
import TeachingJournalForm from "./Views/Form";
import { Toaster } from "sonner";
import LoadingData from "./components/LoadingData";
import useUser from "./lib/Hook/useUser";

const App = () => {
  const { fetchUser, loadingUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, []);
  if (loadingUser) return <LoadingData />;
  return (
    <Container>
      <TeachingJournalForm />

      <Toaster
        position="bottom-center"
        richColors
        duration={3000}
        closeButton
      />
    </Container>
  );
};

export default App;
