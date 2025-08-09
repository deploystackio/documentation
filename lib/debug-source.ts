// Debug script to see what's being loaded
import { docs } from '../.source/index';

const allDocs = docs.docs;
const allMeta = docs.meta;

console.log('=== ALL DOCS ===');
allDocs.forEach((doc: any) => {
  console.log('Path:', doc._file.path, 'Flattened:', doc._file.flattenedPath);
});

console.log('\n=== DEVELOPMENT DOCS ===');
const developmentDocs = allDocs.filter((doc: any) => 
  doc._file.path.startsWith('development/')
);
developmentDocs.forEach((doc: any) => {
  console.log('Path:', doc._file.path, 'Flattened:', doc._file.flattenedPath);
});

console.log('\n=== SELF-HOSTED DOCS ===');
const selfHostedDocs = allDocs.filter((doc: any) => 
  doc._file.path.startsWith('self-hosted/')
);
selfHostedDocs.forEach((doc: any) => {
  console.log('Path:', doc._file.path, 'Flattened:', doc._file.flattenedPath);
});
