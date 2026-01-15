import { useState } from "react";
import Modal from "./Modal";
import Login from "./Login";
import Register from "./Register";

type Props = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

/**
 * Authntication component
 * * Responsibilities:
 * - Open Modal with login option 
 * - If not a user option is selected provide registeration form
 * - Login user with right credentials or with form submission
 */

const Authentication = ({ isModalOpen, closeModal }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const FormComponent = toggle ? Register : Login;

  const formKey = toggle ? "register" : "login";
  const title = toggle ? "Register" : "Login";

  const closeModalHandler = () => {
    setToggle(false);
    closeModal();
  };

  const toggleHandler = ()=>{
    setToggle(prev=>!prev)
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeModalHandler} title={title}>
      {/* Content passed as children */}
      <div className="w-full flex flex-col items-center gap-5">
        <div key={formKey} className="w-full">
          <FormComponent closeModal={closeModalHandler} toggleHandler={toggleHandler}/>
        </div>
       
      </div>
    </Modal>
  );
};

export default Authentication;
