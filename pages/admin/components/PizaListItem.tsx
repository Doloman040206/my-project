import React from 'react';
import { PizaObject } from '../../../app/types';

export interface PizaListItemProps {
  piza: PizaObject;
  onDelete: (id: number) => void;
  onEditRequest: (piza: PizaObject) => void;
}

export function PizaListItem({ piza, onDelete, onEditRequest }: PizaListItemProps) {
  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button
          onClick={() => onDelete(piza.id)}
          style={{
            fontSize: '1rem',
            padding: '8px 14px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>

        <button
          onClick={() => onEditRequest(piza)}
          style={{
            fontSize: '1rem',
            padding: '8px 14px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Edit
        </button>
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ marginBottom: 6 }}>
          <label style={{ marginRight: 8, fontWeight: 500 }}>Name:</label>
          <span style={{ fontWeight: 700 }}>{piza?.name ?? 'No name'}</span>
        </div>

        <div style={{ marginBottom: 6 }}>
          <label style={{ marginRight: 8, fontWeight: 500 }}>Ingredients:</label>
          <span style={{ fontWeight: 700 }}>{piza?.ingridients ?? 'No ingridients'}</span>
        </div>

        <div>
          <label style={{ marginRight: 8, fontWeight: 500 }}>Price:</label>
          <span style={{ fontWeight: 700 }}>{piza?.price ?? 'No price'}</span>
        </div>
      </div>
    </div>
  );
}

export default PizaListItem;
