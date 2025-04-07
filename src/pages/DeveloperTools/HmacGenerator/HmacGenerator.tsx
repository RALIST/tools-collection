import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";

import ToolLayout from "../../../components/layout/ToolLayout/ToolLayout";
import ButtonMain from "../../../components/common/UI/Buttons/ButtonMain/ButtonMain";
import ButtonSecond from "../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond";
import Textarea from "../../../components/common/UI/Textarea/Textarea";
import Input from "../../../components/common/UI/Input/Input"; // Need Input for the key
import Select from "../../../components/common/UI/Select/Select"; // Need Select for hash algorithm

import styles from "./HmacGenerator.module.css";

type HmacHashAlgorithm = "SHA-256" | "SHA-384" | "SHA-512"; // Supported by Web Crypto

const HASH_ALGO_OPTIONS: { value: HmacHashAlgorithm; name: string }[] = [
  { value: "SHA-256", name: "HMAC-SHA256" },
  { value: "SHA-384", name: "HMAC-SHA384" },
  { value: "SHA-512", name: "HMAC-SHA512" },
];

const HmacGenerator: React.FC = () => {
  const [inputData, setInputData] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [hashAlgorithm, setHashAlgorithm] =
    useState<HmacHashAlgorithm>("SHA-256");
  const [outputHmac, setOutputHmac] = useState("");

  const generateHmac = useCallback(async () => {
    if (!inputData.trim()) {
      toast.error("Please enter data to generate HMAC for.");
      return;
    }
    if (!secretKey.trim()) {
      toast.error("Please enter a secret key.");
      return;
    }

    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secretKey);
      const messageData = encoder.encode(inputData);

      // Import the key
      const cryptoKey = await crypto.subtle.importKey(
        "raw", // key format
        keyData, // key material
        { name: "HMAC", hash: hashAlgorithm }, // algorithm details
        false, // extractable
        ["sign"] // key usages
      );

      // Sign the data (generate HMAC)
      const signature = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        messageData
      );

      // Convert the signature to hex
      const hashArray = Array.from(new Uint8Array(signature));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      setOutputHmac(hashHex);
      toast.success(`${hashAlgorithm} HMAC generated successfully!`);
    } catch (error) {
      toast.error("Failed to generate HMAC. Check key or data.");
      console.error("HMAC generation error:", error);
      setOutputHmac("");
    }
  }, [inputData, secretKey, hashAlgorithm]);

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  const handleClear = () => {
    setInputData("");
    setSecretKey("");
    setOutputHmac("");
    toast.success("Cleared all fields!");
  };

  return (
    // TODO: Add 'hmacGenerator' to ToolName type and data files
    <ToolLayout toolName="hmacGenerator">
      {" "}
      {/* Use the correct toolName */}
      <div className={styles.hmacGenerator}>
        <div className={styles.controls}>
          {/* Algorithm Selector */}
          <div className={styles.controlGroup}>
            <label htmlFor="hmac-algo-select">Algorithm:</label>
            <Select
              id="hmac-algo-select"
              value={hashAlgorithm}
              onChange={(e) =>
                setHashAlgorithm(e.target.value as HmacHashAlgorithm)
              }
              optionsList={HASH_ALGO_OPTIONS}
              ariaLabel="Select HMAC hash algorithm"
            />
          </div>

          {/* Secret Key Input */}
          <div className={styles.controlGroup}>
            <label htmlFor="secret-key-input">Secret Key:</label>
            <Input
              id="secret-key-input"
              type="password" // Use password type to obscure key
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key..."
            />
          </div>
        </div>

        {/* Text Areas */}
        <div className={styles.textAreas}>
          <div className={styles.textAreaContainer}>
            <label htmlFor="input-data-area">Input Data:</label>
            <Textarea // Removed id prop
              // id="input-data-area"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Enter data..."
              rows={10}
            />
          </div>
          <div className={styles.textAreaContainer}>
            <label>HMAC Value ({hashAlgorithm})</label>
            <Textarea
              value={outputHmac}
              readOnly
              placeholder="HMAC value will appear here..."
              rows={10}
            />
            <div className={styles.buttonGroup}>
              <ButtonSecond onClick={() => handleCopy(outputHmac)} size="small">
                Copy HMAC
              </ButtonSecond>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <ButtonMain onClick={generateHmac} active>
            Generate HMAC
          </ButtonMain>
          <ButtonSecond onClick={handleClear}>Clear All</ButtonSecond>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HmacGenerator;
