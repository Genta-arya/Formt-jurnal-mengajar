import React, { useEffect } from "react";
import Container from "./components/Container";
import TeachingJournalForm from "./Views/Form";
import { Toaster } from "sonner";
import LoadingData from "./components/LoadingData";
import useUser from "./lib/Hook/useUser";
import FooterFormulir from "./components/Footer";

const App = () => {
  const { fetchUser, loadingUser } = useUser();
  useEffect(() => {
    fetchUser();

    window.scrollTo(0, 0);
  }, []);
  if (loadingUser) return <LoadingData />;
  return (
    <Container>
      {!loadingUser && <TeachingJournalForm />}

      <Toaster
        position="bottom-center"
        richColors
        duration={3000}
        closeButton
      />
      <FooterFormulir />
    </Container>
  );
};

export default App;
