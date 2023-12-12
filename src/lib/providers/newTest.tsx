import { createContext, ReactNode, useContext, useState } from "react";
import { Poppins } from "next/font/google";
import { api } from "@utils/api";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface TestContextData {
  isModalVisible: boolean;
  toggleModal: () => void;
}

export const TestContext = createContext({} as TestContextData);

interface TestProviderProps {
  children: ReactNode;
}

export const TestProvider = ({ children }: TestProviderProps) => {
  const [newTest, setNewTest] = useState({
    testId: "PTMSPG",
    customerId: "",
    scheduledFor: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  });

  const { mutate: createTest } = api.test.create.useMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);

    setNewTest({
      testId: "PTMSPG",
      customerId: "",
      scheduledFor: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
  }

  return (
    <div className={poppins.className}>
      <TestContext.Provider value={{ isModalVisible, toggleModal }}>
        {children}
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="flex h-52 w-[460px] flex-col items-center justify-center gap-4 rounded-xl bg-red-950 p-8">
              <div className="grid grid-cols-2 items-center gap-2">
                <label className="text-xl font-bold" htmlFor="testId">
                  Nº de Ordem
                </label>
                <input
                  className="rounded bg-red-500 px-2 text-lg font-medium outline-none"
                  type="text"
                  name="testId"
                  id="testId"
                  value={newTest.testId}
                  onChange={(e) =>
                    setNewTest({
                      ...newTest,
                      [e.target.name]: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <label className="text-xl font-bold" htmlFor="customerId">
                  Ficha de Cliente
                </label>
                <input
                  className="rounded bg-red-500 px-2 text-lg font-medium outline-none"
                  type="text"
                  name="customerId"
                  id="customerId"
                  value={newTest.customerId}
                  onChange={(e) =>
                    setNewTest({
                      ...newTest,
                      [e.target.name]: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <button
                onClick={() =>
                  createTest(newTest, {
                    onSuccess: toggleModal,
                  })
                }
                className="mt-auto flex w-full items-center justify-center rounded-xl bg-red-800 p-2"
              >
                Confirmar registo
              </button>
            </div>
          </div>
        )}
      </TestContext.Provider>
    </div>
  );
};

export const useTestProvider = () => useContext(TestContext);
