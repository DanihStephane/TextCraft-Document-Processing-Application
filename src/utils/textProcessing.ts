import { ProcessingMode } from '../context/DocumentContext';

// Main processing function that routes to specific processors
export function processDocument(text: string, mode: ProcessingMode): string {
  if (!text) return '';
  
  switch (mode) {
    case 'simplify':
      return simplifyLegalLanguage(text);
    case 'toc':
      return generateTableOfContents(text);
    case 'deduplicate':
      return removeDuplicateLines(text);
    case 'annotate':
      return annotateDocument(text);
    case 'faq':
      return generateFAQ(text);
    case 'summary':
      return createExecutiveSummary(text);
    default:
      return text;
  }
}

// Simplifies legal language to plain language
function simplifyLegalLanguage(text: string): string {
  // For demonstration purposes, we'll implement a simple replacement of common legal terms
  const legalTerms: Record<string, string> = {
    'hereinafter': 'from now on',
    'aforementioned': 'previously mentioned',
    'pursuant to': 'according to',
    'in accordance with': 'following',
    'notwithstanding': 'despite',
    'heretofore': 'until now',
    'therein': 'in that',
    'thereto': 'to that',
    'thereafter': 'after that',
    'whereby': 'by which',
    'wherein': 'in which',
    'inter alia': 'among other things',
    'shall': 'will',
    'herein': 'in this document'
  };
  
  let simplifiedText = text;
  
  // Replace legal terms with simpler alternatives
  Object.entries(legalTerms).forEach(([term, replacement]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    simplifiedText = simplifiedText.replace(regex, replacement);
  });
  
  // Break up long sentences (basic implementation)
  simplifiedText = simplifiedText.replace(/([.!?])\s+/g, '$1\n\n');
  
  // Add a simplified language notice
  return `[SIMPLIFIED VERSION]\n\n${simplifiedText}\n\n[Note: This is an automatically simplified version of the original legal text. Please consult the original document for legal purposes.]`;
}

// Generates a table of contents based on headings
function generateTableOfContents(text: string): string {
  // We'll look for lines that appear to be headings (capitalized, shorter lines)
  const lines = text.split('\n');
  const headings: { text: string; level: number }[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Very basic heading detection - this would be more sophisticated in a real app
    if (line && line === line.toUpperCase() && line.length < 100) {
      headings.push({ text: line, level: 1 });
    } else if (line && /^[A-Z0-9]/.test(line) && line.length < 80 && !line.endsWith('.')) {
      headings.push({ text: line, level: 2 });
    }
  }
  
  // Generate TOC
  let toc = "# TABLE OF CONTENTS\n\n";
  
  headings.forEach((heading, index) => {
    const indent = '  '.repeat(heading.level - 1);
    toc += `${indent}${heading.level}. ${heading.text} ...... Page ${index + 1}\n`;
  });
  
  // Add the original text after the TOC
  return `${toc}\n\n---\n\n${text}`;
}

// Removes duplicate lines from text
function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const uniqueLines = [...new Set(lines)];
  
  const removedCount = lines.length - uniqueLines.length;
  
  return `[DUPLICATE REMOVAL SUMMARY]\nRemoved ${removedCount} duplicate line${removedCount === 1 ? '' : 's'}.\n\n${uniqueLines.join('\n')}`;
}

// Adds legal annotations to a contract
function annotateDocument(text: string): string {
  // Simple example that looks for common contract sections and adds annotations
  const annotationPatterns: Record<string, string> = {
    'term': '[ANNOTATION: The term section defines the duration of the agreement. Check that all dates are accurate.]',
    'termination': '[ANNOTATION: The termination clause sets conditions for ending the agreement. Ensure proper notice periods.]',
    'payment': '[ANNOTATION: The payment section outlines financial obligations. Verify amounts and due dates.]',
    'confidential': '[ANNOTATION: This confidentiality clause protects sensitive information. Review scope and duration.]',
    'warranty': '[ANNOTATION: The warranty section details product/service guarantees. Check for limitations.]',
    'liability': '[ANNOTATION: The liability section limits legal responsibility. Consider insurance requirements.]',
    'indemnification': '[ANNOTATION: This indemnification clause allocates risk. Ensure it\'s balanced between parties.]'
  };
  
  let annotatedText = text;
  
  // Add annotations where patterns are found
  Object.entries(annotationPatterns).forEach(([pattern, annotation]) => {
    const regex = new RegExp(`(.*\\b${pattern}\\b.*?)(?=\\n)`, 'gi');
    annotatedText = annotatedText.replace(regex, `$1\n\n${annotation}\n`);
  });
  
  return annotatedText;
}

// Generates a FAQ from document content
function generateFAQ(text: string): string {
  // In a real app, this would use NLP to extract key topics
  // For demo purposes, we'll generate some basic questions from the content
  
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const questions: string[] = [];
  
  // Get a sample of sentences to turn into questions
  const sampleSentences = sentences
    .filter(s => s.length > 30 && s.length < 200) // Filter out very short or long sentences
    .slice(0, Math.min(10, sentences.length)); // Take up to 10 sentences
  
  // Create questions from sentences
  sampleSentences.forEach(sentence => {
    const cleanSentence = sentence.trim();
    
    // Turn statements into questions
    if (cleanSentence.includes(' is ')) {
      questions.push(`What is ${cleanSentence.split(' is ')[1].replace(/[.!?]+$/, '?')}`);
    } else if (cleanSentence.includes(' are ')) {
      questions.push(`What are ${cleanSentence.split(' are ')[1].replace(/[.!?]+$/, '?')}`);
    } else if (cleanSentence.includes(' must ')) {
      questions.push(`Why must ${cleanSentence.split(' must ')[1].replace(/[.!?]+$/, '?')}`);
    } else if (cleanSentence.includes(' should ')) {
      questions.push(`Why should ${cleanSentence.split(' should ')[1].replace(/[.!?]+$/, '?')}`);
    }
  });
  
  // Format FAQ
  let faq = "# FREQUENTLY ASKED QUESTIONS\n\n";
  
  questions.forEach((question, index) => {
    faq += `Q${index + 1}: ${question}\n`;
    faq += `A${index + 1}: ${generateSimpleAnswer(question, text)}\n\n`;
  });
  
  // Add a general question about the document
  faq += `Q${questions.length + 1}: What is the purpose of this document?\n`;
  faq += `A${questions.length + 1}: This document appears to ${guessDocumentPurpose(text)}.\n\n`;
  
  return faq;
}

// Helper for FAQ generation - creates a simple answer
function generateSimpleAnswer(question: string, sourceText: string): string {
  // In a real app, this would use NLP to extract relevant information
  // For demo, we'll look for sentences that might relate to the question
  
  const questionWords = question
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3);
    
  const sentences = sourceText.match(/[^.!?]+[.!?]+/g) || [];
  
  // Find sentences that contain key words from the question
  const relevantSentences = sentences.filter(sentence => {
    const sentenceLower = sentence.toLowerCase();
    return questionWords.some(word => sentenceLower.includes(word));
  });
  
  // Return a relevant sentence or a generic response
  return relevantSentences.length > 0 
    ? relevantSentences[0].trim()
    : "Please refer to the document for details on this topic.";
}

// Helper for FAQ generation - guesses document purpose
function guessDocumentPurpose(text: string): string {
  const textLower = text.toLowerCase();
  
  if (textLower.includes('agreement') && textLower.includes('parties')) {
    return 'outline an agreement between parties';
  } else if (textLower.includes('policy') && (textLower.includes('privacy') || textLower.includes('security'))) {
    return 'establish policies or guidelines';
  } else if (textLower.includes('report') && (textLower.includes('findings') || textLower.includes('results'))) {
    return 'present findings or results';
  } else {
    return 'provide important information';
  }
}

// Creates an executive summary of a longer document
function createExecutiveSummary(text: string): string {
  // In a real app, this would use NLP for sophisticated summarization
  // For demo purposes, we'll extract key sentences
  
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // Very simple summarization - extract first sentence of each paragraph
  // and any sentences with key terms
  const keyTerms = ['important', 'significant', 'critical', 'essential', 'conclude', 'summary', 'result'];
  const summary: string[] = [];
  
  // Get the first sentence (likely introduces the document)
  if (sentences.length > 0) {
    summary.push(sentences[0].trim());
  }
  
  // Find paragraph starts (simplistic approach)
  for (let i = 1; i < sentences.length; i++) {
    if (sentences[i-1].endsWith('\n\n') || sentences[i-1].endsWith('\r\n\r\n')) {
      summary.push(sentences[i].trim());
    }
  }
  
  // Add sentences with key terms
  sentences.forEach(sentence => {
    const sentenceLower = sentence.toLowerCase();
    if (keyTerms.some(term => sentenceLower.includes(term)) && !summary.includes(sentence.trim())) {
      summary.push(sentence.trim());
    }
  });
  
  // Limit to a reasonable length (10 sentences max)
  const finalSummary = summary.slice(0, 10);
  
  // Format the summary
  return `# EXECUTIVE SUMMARY\n\n${finalSummary.join('\n\n')}\n\n[Note: This is an automatically generated summary. The full document contains additional important details.]`;
}