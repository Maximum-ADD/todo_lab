import { describe, it, expect } from 'vitest';
import { daysUntilDue } from './date';

function daysFromToday(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
};

describe('daysUntilDue', () => {
    it('returns 0 when given same day as due date ', () => {
        expect(daysUntilDue(daysFromToday(0))).toBe(0)
    }) ;   
    it('returns -1 when given day after due date ', () => {
        expect(daysUntilDue(daysFromToday(-1))).toBe(-1)
    })  ;  
    it('returns 7 when given week before due date ', () => {
        expect(daysUntilDue(daysFromToday(7))).toBe(7)
    })
    
})
