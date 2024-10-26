import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  photoGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoContainer: {
    width: '48%',
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginBottom: 5,
  },
  photoCaption: {
    fontSize: 10,
    color: '#666',
  },
});

interface Props {
  project: any;
  photos: any[];
}

export default function ProjectReport({ project, photos }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.subtitle}>{project.address}</Text>
          <Text style={styles.subtitle}>
            Generated on {format(new Date(), 'MMMM d, yyyy')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Details</Text>
          <Text style={styles.subtitle}>Category: {project.category}</Text>
          <Text style={styles.subtitle}>Total Photos: {photos.length}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo Documentation</Text>
          <View style={styles.photoGrid}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image src={photo.url} style={styles.photo} />
                <Text style={styles.photoCaption}>
                  {format(photo.date, 'MMM d, yyyy')} - {photo.notes || 'No notes'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}