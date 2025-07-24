import React from "react";
import Container from "./components/Container";
import TeachingJournalForm from "./Views/Form";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Container>
      <TeachingJournalForm />

      <Toaster position="bottom-center" richColors duration={3000} closeButton />
    </Container>
  );
};

export default App;
