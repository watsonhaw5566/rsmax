import { createSnapshotSerializer } from 'path-serializer';
import path from 'node:path';

expect.addSnapshotSerializer(
  createSnapshotSerializer({
    root: path.join(__dirname, '..'),
  }),
);
