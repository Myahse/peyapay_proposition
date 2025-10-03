import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface OtpBottomSheetProps {
  onAutoFill?: (code: string) => void;
  onSubmit?: (code: string) => boolean | void; // returns true if correct, false if not
  codeLength?: number;
  autoFillDelay?: number; // ms
  resendDelay?: number; // seconds
}

const OtpBottomSheet: React.FC<OtpBottomSheetProps> = ({
  onAutoFill,
  onSubmit,
  codeLength = 4,
  autoFillDelay = 2000,
  resendDelay = 60,
}) => {
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
  const [timer, setTimer] = useState<number>(0); // Start at 0, only count after click
  const [resendActive, setResendActive] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(-1); // No box focused initially
  const [error, setError] = useState<boolean>(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  // Simulate auto-filling the OTP after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fakeCode = '1234'.slice(0, codeLength).split('');
      setCode(fakeCode);
      setActiveIndex(codeLength - 1);
      if (onAutoFill) onAutoFill(fakeCode.join(''));
      if (onSubmit) onSubmit(fakeCode.join(''));
    }, autoFillDelay);
    return () => clearTimeout(timeout);
  }, [autoFillDelay, codeLength, onAutoFill, onSubmit]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      setResendActive(false);
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendActive(true);
    }
  }, [timer]);

  // Handle input change
  const handleChange = (text: string, idx: number) => {
    setError(false); // clear error on any change
    if (!/^[0-9]?$/.test(text)) return; // Only allow single digit
    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);
    if (text && idx < codeLength - 1) {
      inputs.current[idx + 1]?.focus();
      setActiveIndex(idx + 1);
    }
    if (!text && idx > 0) {
      setActiveIndex(idx - 1);
    }
    // If all boxes are filled, trigger submit
    if (text && idx === codeLength - 1 && newCode.every(c => c.length === 1)) {
      if (onSubmit) {
        const result = onSubmit(newCode.join(''));
        if (result === false) setError(true);
      }
    }
  };

  // Handle focus
  const handleFocus = (idx: number) => {
    setActiveIndex(idx);
  };

  // Handle resend click
  const handleResend = () => {
    setTimer(resendDelay);
    // Optionally, trigger resend logic here (e.g., send new OTP)
  };

  // Handle retry
  const handleRetry = () => {
    setCode(Array(codeLength).fill(''));
    setError(false);
    setActiveIndex(-1);
    inputs.current[0]?.blur();
  };

  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>Validation code</Text>
      <Text style={styles.subtitle}>
        OTP automatic verification is onload.{"\n"}
        Please type the password you received by SMS
      </Text>
      <View style={[
        styles.otpGroup,
        error && styles.otpGroupError,
      ]}>
        {Array.from({ length: codeLength }).map((_, idx) => {
          const isActive = activeIndex === idx;
          const isFilled = !!code[idx];
          return (
            <View
              key={idx}
              style={[
                styles.otpBox,
                isActive && styles.otpBoxActive,
                isFilled && !isActive && styles.otpBoxFilled,
              ]}
            >
              <TextInput
                ref={ref => {
                  inputs.current[idx] = ref;
                }}
                style={styles.otpInput}
                value={code[idx]}
                onChangeText={text => handleChange(text.replace(/[^0-9]/g, ''), idx)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                onFocus={() => handleFocus(idx)}
                selectionColor="#222"
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    if (code[idx]) {
                      // If current box is not empty, clear it
                      const newCode = [...code];
                      newCode[idx] = '';
                      setCode(newCode);
                    } else if (idx > 0) {
                      // If current box is empty, move to previous and clear it
                      const newCode = [...code];
                      newCode[idx - 1] = '';
                      setCode(newCode);
                      inputs.current[idx - 1]?.focus();
                      setActiveIndex(idx - 1);
                    }
                  }
                }}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                autoCapitalize="none"
                showSoftInputOnFocus={true}
              />
            </View>
          );
        })}
      </View>
      {error && (
        <View style={styles.errorRow}>
          <MaterialIcons name="error-outline" size={18} color="#FF3B30" style={{ marginRight: 4 }} />
          <Text style={styles.errorText}>Invalid OTP code</Text>
        </View>
      )}
      {resendActive ? (
        <Text style={[styles.resend, { color: '#FFC42C', fontWeight: 'bold' }]} onPress={handleResend}>
          Resend code
        </Text>
      ) : (
        <Text style={styles.resend}>
          Resend code in : {timer < 10 ? `00:0${timer}` : `00:${timer}`}
        </Text>
      )}
      {error && (
        <Text style={styles.retryBtn} onPress={handleRetry}>
          Retry
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  otpGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 12,
    paddingVertical: 8,
  },
  otpGroupError: {
    borderColor: '#FF3B30',
    borderWidth: 2.5,
  },
  otpBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E5E7EB', // gray-200
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFilled: {
    backgroundColor: '#BDBDBD', // darker gray for filled
  },
  otpBoxActive: {
    backgroundColor: '#FFC42C', // yellow highlight
    borderColor: '#FFC42C',
    borderWidth: 2,
  },
  otpInput: {
    fontSize: 28,
    color: '#222',
    fontWeight: '600',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 2,
    alignSelf: 'flex-start',
    marginLeft: 18,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  resend: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  retryBtn: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default OtpBottomSheet; 