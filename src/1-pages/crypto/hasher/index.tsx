import { Combobox, Stack, TextInput, useCombobox } from "@mantine/core";
import sodium from "libsodium-wrappers-sumo";
import { useState } from "react";
await sodium.ready;

export default function Hasher() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [hashFunctionName, setHashFunctionName] = useState("sha256");

  return (
    <>
      <Stack justify="start">
        <TextInput label="Data to hash" />
        <Combobox
          store={combobox}
          onOptionSubmit={(value) => {
            setHashFunctionName(value);
            combobox.closeDropdown();
          }}
        ></Combobox>
      </Stack>
    </>
  );
}
