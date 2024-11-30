"use client";

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { codingTips } from '@/lib/tips';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#050505',
  },
  logo: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 24,
    color: '#90CA03',
    fontFamily: 'Courier',
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1px solid #90CA03',
  },
  category: {
    fontSize: 14,
    color: '#90CA03',
    marginBottom: 5,
    fontFamily: 'Courier',
  },
  tip: {
    fontSize: 12,
    marginBottom: 3,
    color: '#FFFFFF',
    fontFamily: 'Courier',
  },
  details: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 10,
    fontFamily: 'Courier',
  },
});

const PDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.logo}>
        <Text>Guide SWS Elite</Text>
      </View>
      {codingTips.map((tip) => (
        <View key={tip.id} style={styles.section}>
          <Text style={styles.category}>{tip.category}</Text>
          <Text style={styles.tip}>{tip.tip}</Text>
          <Text style={styles.details}>{tip.details}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export function PDFDownloadButton() {
  return (
    <PDFDownloadLink document={<PDFDocument />} fileName="conseils-hackathon.pdf">
      {({ loading }) => (
        <Button 
          disabled={loading} 
          className="bg-[#90CA03] hover:bg-[#90CA03]/80 text-black font-mono transition-all duration-300"
        >
          <Download className="mr-2 h-4 w-4" />
          {loading ? 'Génération...' : 'Télécharger PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}