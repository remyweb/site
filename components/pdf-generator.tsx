"use client";

import {
  Document,
  Svg,
  Path,
  Page,
  Text,
  View,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { codingTips } from "@/lib/tips";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#050505",
  },
  logo: {
    width: 20,
    height: 20,
    margin: '0 auto',
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: "1px solid #90CA03",
  },
  category: {
    fontSize: 14,
    color: "#90CA03",
    marginBottom: 5,
    fontFamily: "Courier",
  },
  tip: {
    fontSize: 12,
    marginBottom: 3,
    color: "#FFFFFF",
    fontFamily: "Courier",
  },
  details: {
    fontSize: 10,
    color: "#888888",
    marginBottom: 10,
    fontFamily: "Courier",
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#888888',
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
      <View style={styles.footer}>
        <Text>© 2024 Powered by the SWS Teams</Text>
        <Svg style={styles.logo} viewBox="0 0 24 24">
          <Path d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM16.9997 4C18.6566 4 19.9997 5.34315 19.9997 7V17C19.9997 18.6569 18.6566 20 16.9997 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H16.9997ZM12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7ZM12 9C13.1041 9 14 9.89543 14 11C14 12.1046 13.1041 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9ZM17.5 6C17.2239 6 17 6.22386 17 6.5C17 6.77614 17.2239 7 17.5 7C17.7761 7 18 6.77614 18 6.5C18 6.22386 17.7761 6 17.5 6Z" />
        </Svg>
        <Text>@sws.corp</Text>
      </View>
    </Page>
  </Document>
);

export function PDFDownloadButton() {
    return (
      <BlobProvider document={<PDFDocument />}>
        {({ url, loading }) => (
          <a href={url ?? undefined} download="conseils-hackathon.pdf">
            <Button
              disabled={loading}
              className="bg-[#90CA03] hover:bg-[#90CA03]/80 text-black font-mono transition-all duration-300"
            >
              {loading ? 'Chargement du PDF...' : 'Télécharger le PDF'}
            </Button>
          </a>
        )}
      </BlobProvider>
    );
  }
