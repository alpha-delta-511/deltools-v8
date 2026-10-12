import {
  Combobox,
  Input,
  InputBase,
  Stack,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import sodium from "libsodium-wrappers-sumo";
import { useState } from "react";
import { ALGORITHM_LIST, selectHasher } from "../../../5-shared/lib/hashing";
await sodium.ready;

export default function Hasher() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [hashFunctionName, setHashFunctionName] = useState("sha256");
  const hashFunctionComboboxOptions = Object.keys(ALGORITHM_LIST).map(
    (item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ),
  );

  const [hashInput, setHashInput] = useState("");

  const [hashResult, setHashResult] = useState("");

  const hash = (value: string) => {
    setHashInput(value);

    const hasher = selectHasher(hashFunctionName);
    const hash = hasher(value);

    setHashResult(
      `Hex: ${sodium.to_hex(hash)}\nBase64:${sodium.to_base64(hash)}`,
    );
  };

  return (
    <>
      <Stack justify="start">
        <TextInput
          label="Data to hash"
          value={hashInput}
          onChange={(event) => hash(event.target.value)}
        />
        <Combobox
          store={combobox}
          onOptionSubmit={(value) => {
            setHashFunctionName(value);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {hashFunctionName || (
                <Input.Placeholder>Pick value</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{hashFunctionComboboxOptions}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <Text>{hashResult}</Text>
      </Stack>
    </>
  );
}
