'use client';

import { useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { formatCPF, formatPhone, formatCEP } from '@/shared/lib/formatters';
import styles from './page.module.scss';

export default function CheckoutPage() {
  // Form state
  const [email, setEmail] = useState('example@example.com');
  const [cpfCnpj, setCpfCnpj] = useState('332.472.477-50');
  const [name, setName] = useState('John');
  const [surname, setSurname] = useState('Doe');
  const [phone, setPhone] = useState('+5511989601225');
  const [cep, setCep] = useState('');
  const [number, setNumber] = useState('1234');
  const [complement, setComplement] = useState('Casa azul');
  const [hasNoNumber, setHasNoNumber] = useState(false);

  // Error states for demonstration
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [cpfCnpjError, setCpfCnpjError] = useState<string | undefined>(undefined);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [surnameError, setSurnameError] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
  const [cepError, setCepError] = useState<string | undefined>(undefined);

  // Success states (based on images)
  const emailSuccess = Boolean(email && !emailError);
  const cpfCnpjSuccess = Boolean(cpfCnpj && !cpfCnpjError);
  const nameSuccess = Boolean(name && !nameError);
  const surnameSuccess = Boolean(surname && !surnameError);
  const phoneSuccess = Boolean(phone && !phoneError);
  const complementSuccess = Boolean(complement && complement.length > 0);

  // Handlers with formatting
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCPF(value);
    setCpfCnpj(formatted);
    setCpfCnpjError(undefined);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhone(value);
    setPhone(formatted);
    setPhoneError(undefined);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCEP(value);
    setCep(formatted);
    setCepError(undefined);
  };

  const handleCepLookup = () => {
    // Placeholder for CEP lookup functionality
    console.log('CEP lookup clicked');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Form */}
          <div className={styles.formSection}>
            {/* Dados de contato */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Dados de contato</h2>
              <Input
                label="E-mail"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(undefined);
                }}
                success={emailSuccess}
                error={emailError}
                required
                fullWidth
              />
            </section>

            {/* Dados para nota fiscal */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Dados para nota fiscal</h2>
              <Input label="País" value="Brasil" readOnly fullWidth />
              <Input
                label="CPF ou CNPJ"
                placeholder="CPF ou CNPJ"
                value={cpfCnpj}
                onChange={handleCpfCnpjChange}
                success={cpfCnpjSuccess}
                error={cpfCnpjError}
                required
                fullWidth
              />
            </section>

            {/* Dados de quem vai fazer o pagamento */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Dados de quem vai fazer o pagamento</h2>
              <div className={styles.row}>
                <Input
                  label="Nome"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(undefined);
                  }}
                  success={nameSuccess}
                  error={nameError}
                  required
                  fullWidth
                />
                <Input
                  label="Sobrenome"
                  placeholder="Sobrenome"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                    setSurnameError(undefined);
                  }}
                  success={surnameSuccess}
                  error={surnameError}
                  required
                  fullWidth
                />
              </div>
              <Input
                label="Telefone com DDD"
                type="tel"
                placeholder="Telefone com DDD"
                value={phone}
                onChange={handlePhoneChange}
                success={phoneSuccess}
                error={phoneError}
                required
                fullWidth
              />
              <Input
                label="CEP"
                placeholder="CEP"
                value={cep}
                onChange={handleCepChange}
                error={cepError}
                helperLink={{
                  text: 'Não sei meu CEP',
                  onClick: handleCepLookup,
                }}
                required
                fullWidth
              />
              <div className={styles.row}>
                <Input
                  label="Número"
                  placeholder="Número"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  disabled={hasNoNumber}
                  fullWidth
                />
                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    id="no-number"
                    checked={hasNoNumber}
                    onChange={(e) => setHasNoNumber(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <label htmlFor="no-number" className={styles.checkboxLabel}>
                    Sem número
                  </label>
                </div>
              </div>
              <Input
                label="Complemento"
                placeholder="Complemento (opcional)"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                success={complementSuccess}
                optional
                fullWidth
              />
            </section>

            {/* Error State Examples */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Estados de erro (para teste)</h2>
              <Input
                label="E-mail"
                type="email"
                placeholder="E-mail"
                value=""
                error="Este campo deve ser preenchido"
                required
                fullWidth
              />
              <Input
                label="CPF ou CNPJ"
                placeholder="CPF ou CNPJ"
                value=""
                error="Este campo deve ser preenchido"
                required
                fullWidth
              />
              <Input
                label="Nome"
                placeholder="Nome"
                value=""
                error="Este campo deve ser preenchido"
                required
                fullWidth
              />
              <Input
                label="Sobrenome"
                placeholder="Sobrenome"
                value=""
                error="Este campo deve ser preenchido"
                required
                fullWidth
              />
              <Input
                label="Telefone com DDD"
                type="tel"
                placeholder="Telefone com DDD"
                value=""
                error="Este campo deve ser preenchido"
                required
                fullWidth
              />
              <Input
                label="CEP"
                placeholder="CEP"
                value=""
                error="Este campo deve ser preenchido"
                helperLink={{
                  text: 'Não sei meu CEP',
                  onClick: handleCepLookup,
                }}
                required
                fullWidth
              />
            </section>
          </div>

          {/* Right Column - Order Summary (Placeholder) */}
          <aside className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Resumo do pedido</h3>
              <p className={styles.summaryPlaceholder}>Order summary will be implemented here</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
