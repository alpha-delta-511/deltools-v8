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
import { useEffect, useRef, useState } from "react";
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

  const [hashResultBase64, setHashResultBase64] = useState("");
  const [hashResultHex, setHashResultHex] = useState("");

  const hashInputRef = useRef(hashInput);
  useEffect(() => {
    hashInputRef.current = hashInput;
  }, [hashInput]);

  const hashFunctionRef = useRef(hashFunctionName);
  useEffect(() => {
    hashFunctionRef.current = hashFunctionName;
  }, [hashFunctionName]);

  const hash = () => {
    const input = hashInputRef.current;
    if (input == "") {
      setHashResultBase64("");
      setHashResultHex("");

      return;
    }

    const hasher = selectHasher(hashFunctionRef.current);
    const hashResult = hasher(input);

    setHashResultBase64(sodium.to_base64(hashResult));
    setHashResultHex(sodium.to_hex(hashResult));
  };

  const [hashingTimeout, setHashingTimeout] = useState(0);
  const sheduleHashing = () => {
    clearTimeout(hashingTimeout);
    setHashingTimeout(setTimeout(hash, 1000));
  };

  return (
    <>
      <Stack justify="start">
        <TextInput
          label="Data to hash"
          value={hashInput}
          onChange={(event) => {
            setHashInput(event.target.value);
            sheduleHashing();
          }}
        />
        <Combobox
          store={combobox}
          onOptionSubmit={(value) => {
            setHashFunctionName(value);
            combobox.closeDropdown();
            sheduleHashing();
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

          <Text>Hex: {hashResultHex}</Text>
          <Text>Base64: {hashResultBase64}</Text>
        </Combobox>
      </Stack>
    </>
  );
}
