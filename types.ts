import React from 'react';

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface CurriculumItem {
  season: string;
  title: string;
  period: string;
  description: string;
  details: string[];
}

export interface SystemItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}