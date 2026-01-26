'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Rect,
  Circle,
  G,
} from '@react-pdf/renderer';
import {
  MultiPaystubResult,
  PAY_FREQUENCIES,
  formatCurrency,
  formatDate,
  formatDateCompact,
  getStateConfig,
} from '@/lib/taxCalculations';

// Corporate color palette
const colors = {
  primary: '#1e3a5f', // Navy blue
  primaryDark: '#0f2440', // Darker navy
  secondary: '#2563eb', // Bright blue accent
  accent: '#059669', // Green for net pay
  text: '#1f2937', // Dark gray text
  textLight: '#6b7280', // Light gray text
  border: '#d1d5db', // Light border
  borderDark: '#1e3a5f', // Navy border
  background: '#f8fafc', // Light background
  backgroundAlt: '#f1f5f9', // Alternate background
  white: '#ffffff',
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: 'Helvetica',
    backgroundColor: colors.white,
  },
  // Header section
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: `2 solid ${colors.primary}`,
  },
  companySection: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 3,
  },
  companyDetail: {
    fontSize: 8,
    color: colors.textLight,
    marginBottom: 1,
  },
  titleSection: {
    textAlign: 'right',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  documentTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  payInfoBox: {
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 3,
    border: `1 solid ${colors.border}`,
    minWidth: 180,
  },
  payInfoRow: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'center',
  },
  payInfoLabel: {
    fontSize: 7,
    color: colors.textLight,
    textTransform: 'uppercase',
    width: 65,
    flexShrink: 0,
  },
  payInfoValue: {
    fontSize: 7,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'right',
    flexShrink: 0,
  },

  // Employee info section
  employeeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: `1 solid ${colors.border}`,
    paddingBottom: 10,
  },
  employeeBox: {
    flex: 1,
    paddingRight: 15,
  },
  boxLabel: {
    fontSize: 7,
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  employeeName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  employeeDetail: {
    fontSize: 8,
    color: colors.textLight,
    marginBottom: 1,
  },
  infoGrid: {
    marginTop: 4,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  infoLabel: {
    fontSize: 7,
    color: colors.textLight,
    width: 55,
  },
  infoValue: {
    fontSize: 8,
    color: colors.text,
    flex: 1,
  },

  // Main content - Earnings & Deductions
  mainContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  columnLast: {
    flex: 1,
  },

  // Table styles
  tableContainer: {
    border: `1 solid ${colors.borderDark}`,
    borderRadius: 2,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableHeaderAmount: {
    fontSize: 7,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'right',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottom: `0.5 solid ${colors.border}`,
    backgroundColor: colors.white,
  },
  tableRowAlt: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottom: `0.5 solid ${colors.border}`,
    backgroundColor: colors.backgroundAlt,
  },
  tableCell: {
    flex: 2,
    fontSize: 7,
    color: colors.text,
  },
  tableCellAmount: {
    flex: 1,
    fontSize: 7,
    color: colors.text,
    textAlign: 'right',
  },
  tableFooter: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: colors.background,
    borderTop: `1 solid ${colors.primary}`,
  },
  tableFooterText: {
    flex: 2,
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.primary,
  },
  tableFooterAmount: {
    flex: 1,
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'right',
  },

  // Net Pay section
  netPayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryBox: {
    width: '48%',
    border: `1 solid ${colors.border}`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  summaryHeader: {
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottom: `1 solid ${colors.border}`,
  },
  summaryTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  summaryContent: {
    padding: 10,
    backgroundColor: colors.white,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 7,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.text,
  },
  netPayBox: {
    width: '48%',
    border: `2 solid ${colors.accent}`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  netPayHeader: {
    backgroundColor: colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  netPayTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  netPayAmountContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#ecfdf5', // Light green background
  },
  netPayAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
    textAlign: 'center',
  },
  netPaySubtext: {
    fontSize: 7,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 2,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 30,
    right: 30,
    borderTop: `1 solid ${colors.border}`,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 6,
    color: colors.textLight,
  },
  footerPage: {
    fontSize: 6,
    color: colors.textLight,
  },
  footerTimestamp: {
    fontSize: 6,
    color: colors.textLight,
    textAlign: 'center',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 48,
    color: '#e5e7eb',
    opacity: 0.4,
    transform: 'rotate(-30deg)',
    fontWeight: 'bold',
    letterSpacing: 4,
  },
});

interface PaystubPDFProps {
  results: MultiPaystubResult[];
}

// Generate timestamp for PDF
const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function PaystubPDF({ results }: PaystubPDFProps) {
  const generatedAt = getTimestamp();

  return (
    <Document>
      {results.map((result, index) => (
        <Page key={index} size="LETTER" style={styles.page}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.companySection}>
              <Text style={styles.companyName}>{result.input.companyName}</Text>
              <Text style={styles.companyDetail}>{result.input.companyAddress}</Text>
              {result.input.companyPhone && (
                <Text style={styles.companyDetail}>Phone: {result.input.companyPhone}</Text>
              )}
              {result.input.ein && (
                <Text style={styles.companyDetail}>EIN: {result.input.ein}</Text>
              )}
            </View>
            <View style={styles.titleSection}>
              <View style={styles.titleRow}>
                {/* US Flag */}
                <Svg viewBox="0 0 190 100" width={24} height={13}>
                  <Rect width="190" height="100" fill="#B22234" />
                  <Rect y="7.69" width="190" height="7.69" fill="white" />
                  <Rect y="23.08" width="190" height="7.69" fill="white" />
                  <Rect y="38.46" width="190" height="7.69" fill="white" />
                  <Rect y="53.85" width="190" height="7.69" fill="white" />
                  <Rect y="69.23" width="190" height="7.69" fill="white" />
                  <Rect y="84.62" width="190" height="7.69" fill="white" />
                  <Rect width="76" height="53.85" fill="#3C3B6E" />
                  <G fill="white">
                    <Circle cx="9" cy="6" r="2" />
                    <Circle cx="24" cy="6" r="2" />
                    <Circle cx="39" cy="6" r="2" />
                    <Circle cx="54" cy="6" r="2" />
                    <Circle cx="69" cy="6" r="2" />
                    <Circle cx="16" cy="13" r="2" />
                    <Circle cx="31" cy="13" r="2" />
                    <Circle cx="46" cy="13" r="2" />
                    <Circle cx="61" cy="13" r="2" />
                    <Circle cx="9" cy="20" r="2" />
                    <Circle cx="24" cy="20" r="2" />
                    <Circle cx="39" cy="20" r="2" />
                    <Circle cx="54" cy="20" r="2" />
                    <Circle cx="69" cy="20" r="2" />
                    <Circle cx="16" cy="27" r="2" />
                    <Circle cx="31" cy="27" r="2" />
                    <Circle cx="46" cy="27" r="2" />
                    <Circle cx="61" cy="27" r="2" />
                    <Circle cx="9" cy="34" r="2" />
                    <Circle cx="24" cy="34" r="2" />
                    <Circle cx="39" cy="34" r="2" />
                    <Circle cx="54" cy="34" r="2" />
                    <Circle cx="69" cy="34" r="2" />
                    <Circle cx="16" cy="41" r="2" />
                    <Circle cx="31" cy="41" r="2" />
                    <Circle cx="46" cy="41" r="2" />
                    <Circle cx="61" cy="41" r="2" />
                    <Circle cx="9" cy="48" r="2" />
                    <Circle cx="24" cy="48" r="2" />
                    <Circle cx="39" cy="48" r="2" />
                    <Circle cx="54" cy="48" r="2" />
                    <Circle cx="69" cy="48" r="2" />
                  </G>
                </Svg>
                <Text style={styles.documentTitle}>Earnings Statement</Text>
              </View>
              <View style={styles.payInfoBox}>
                <View style={styles.payInfoRow}>
                  <Text style={styles.payInfoLabel}>Period:</Text>
                  <Text style={styles.payInfoValue}>
                    {formatDateCompact(result.input.payPeriodStart)} - {formatDateCompact(result.input.payPeriodEnd)}
                  </Text>
                </View>
                <View style={styles.payInfoRow}>
                  <Text style={styles.payInfoLabel}>Pay Date:</Text>
                  <Text style={styles.payInfoValue}>{formatDate(result.input.payDate)}</Text>
                </View>
                <View style={styles.payInfoRow}>
                  <Text style={styles.payInfoLabel}>Frequency:</Text>
                  <Text style={styles.payInfoValue}>{PAY_FREQUENCIES[result.input.payFrequency].label}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Employee Information */}
          <View style={styles.employeeContainer}>
            <View style={styles.employeeBox}>
              <Text style={styles.boxLabel}>Employee Information</Text>
              <Text style={styles.employeeName}>{result.input.employeeName}</Text>
              {result.input.employeeAddress && (
                <Text style={styles.employeeDetail}>{result.input.employeeAddress}</Text>
              )}
            </View>
            <View style={styles.employeeBox}>
              <Text style={styles.boxLabel}>Employee Details</Text>
              <View style={styles.infoGrid}>
                {result.input.employeeId && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>ID:</Text>
                    <Text style={styles.infoValue}>{result.input.employeeId}</Text>
                  </View>
                )}
                {result.input.ssn && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>SSN:</Text>
                    <Text style={styles.infoValue}>***-**-{result.input.ssn}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Main Content - Earnings & Deductions with YTD */}
          <View style={styles.mainContent}>
            {/* Earnings Table */}
            <View style={styles.column}>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, { flex: 2 }]}>Earnings</Text>
                  <Text style={[styles.tableHeaderAmount, { flex: 1 }]}>Current</Text>
                  <Text style={[styles.tableHeaderAmount, { flex: 1 }]}>YTD</Text>
                </View>

                {result.input.payType === 'hourly' ? (
                  <>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>
                        Regular ({result.input.hoursWorked} hrs @ {formatCurrency(result.input.payRate)})
                      </Text>
                      <Text style={styles.tableCellAmount}>{formatCurrency(result.output.regularPay)}</Text>
                      <Text style={styles.tableCellAmount}>-</Text>
                    </View>
                    {result.output.overtimePay > 0 && (
                      <View style={styles.tableRowAlt}>
                        <Text style={styles.tableCell}>
                          OT ({result.input.overtimeHours} hrs @ {formatCurrency(result.input.payRate * 1.5)})
                        </Text>
                        <Text style={styles.tableCellAmount}>{formatCurrency(result.output.overtimePay)}</Text>
                        <Text style={styles.tableCellAmount}>-</Text>
                      </View>
                    )}
                  </>
                ) : (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Salary</Text>
                    <Text style={styles.tableCellAmount}>{formatCurrency(result.output.regularPay)}</Text>
                    <Text style={styles.tableCellAmount}>-</Text>
                  </View>
                )}

                {result.output.additionalEarnings > 0 && (
                  <View style={result.input.payType === 'hourly' && result.output.overtimePay > 0 ? styles.tableRow : styles.tableRowAlt}>
                    <Text style={styles.tableCell}>
                      {result.output.additionalEarningsDescription || 'Additional Earnings'}
                    </Text>
                    <Text style={styles.tableCellAmount}>{formatCurrency(result.output.additionalEarnings)}</Text>
                    <Text style={styles.tableCellAmount}>-</Text>
                  </View>
                )}

                <View style={styles.tableFooter}>
                  <Text style={styles.tableFooterText}>Gross Pay</Text>
                  <Text style={styles.tableFooterAmount}>{formatCurrency(result.output.grossPay)}</Text>
                  <Text style={styles.tableFooterAmount}>{formatCurrency(result.output.ytdGross)}</Text>
                </View>
              </View>
            </View>

            {/* Deductions Table */}
            <View style={styles.columnLast}>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, { flex: 2 }]}>Deductions</Text>
                  <Text style={[styles.tableHeaderAmount, { flex: 1 }]}>Current</Text>
                  <Text style={[styles.tableHeaderAmount, { flex: 1 }]}>YTD</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Federal Income Tax</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.federalIncomeTax)}</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.ytdFederalTax)}</Text>
                </View>

                <View style={styles.tableRowAlt}>
                  <Text style={styles.tableCell}>Social Security</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.socialSecurityTax)}</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.ytdSocialSecurity)}</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Medicare</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.medicareTax + result.output.additionalMedicareTax)}</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.ytdMedicare)}</Text>
                </View>

                <View style={styles.tableRowAlt}>
                  <Text style={styles.tableCell}>{getStateConfig(result.input.state)?.abbreviation || result.input.state} State Tax</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.stateTax)}</Text>
                  <Text style={styles.tableCellAmount}>{formatCurrency(result.output.ytdStateTax)}</Text>
                </View>

                <View style={styles.tableFooter}>
                  <Text style={styles.tableFooterText}>Total Deductions</Text>
                  <Text style={styles.tableFooterAmount}>{formatCurrency(result.output.totalTaxes)}</Text>
                  <Text style={styles.tableFooterAmount}>{formatCurrency(result.output.ytdTotalTaxes)}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Net Pay and Summary */}
          <View style={styles.netPayContainer}>
            {/* YTD Summary */}
            <View style={styles.summaryBox}>
              <View style={styles.summaryHeader}>
                <Text style={styles.summaryTitle}>Year-to-Date Summary</Text>
              </View>
              <View style={styles.summaryContent}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>YTD Gross Earnings:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(result.output.ytdGross)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>YTD Total Taxes:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(result.output.ytdTotalTaxes)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>YTD Net Pay:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(result.output.ytdNetPay)}</Text>
                </View>
              </View>
            </View>

            {/* Net Pay Box */}
            <View style={styles.netPayBox}>
              <View style={styles.netPayHeader}>
                <Text style={styles.netPayTitle}>Net Pay</Text>
              </View>
              <View style={styles.netPayAmountContainer}>
                <Text style={styles.netPayAmount}>{formatCurrency(result.output.netPay)}</Text>
                <Text style={styles.netPaySubtext}>This Period</Text>
              </View>
            </View>
          </View>

          {/* Watermark */}
          <Text style={styles.watermark}>{result.input.companyName.toUpperCase()}</Text>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Generated by freepaystubgen.com - For reference only. Retain for your records.
            </Text>
            <Text style={styles.footerTimestamp}>Generated: {generatedAt}</Text>
            {results.length > 1 && (
              <Text style={styles.footerPage}>Page {index + 1} of {results.length}</Text>
            )}
          </View>
        </Page>
      ))}
    </Document>
  );
}
