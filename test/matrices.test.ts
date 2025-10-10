import { describe, it, expect } from 'vitest';
import { computeLeopoldCell, computeConesa, computeBattelle } from '../src/lib/matrices';

describe('matrices calculations', () => {
  it('computeLeopoldCell clamps inputs and computes S', () => {
    const cell = computeLeopoldCell({ impactoId: 'i1', magnitud: 12, importancia: 0, S: 0 });
    expect(cell.magnitud).toBe(10);
    expect(cell.importancia).toBe(1);
    expect(cell.S).toBe(Math.abs(10) * 1);
  });

  it('computeConesa returns category correctly', () => {
    const c = computeConesa({ impactoId: 'i2', IN: 12, EX: 8, MO: 4, PE: 4, RV:4, SI:4, AC:4, EF:4, PR:4, MC:8 });
    expect(c.I).toBeGreaterThanOrEqual(75);
    expect(c.categoria).toBe('Crítico');
  });

  it('computeBattelle computes uia correctly', () => {
    const b = computeBattelle({ impactoId: 'i3', uip: 100, calidad_sin: 2, calidad_con: 4 });
    const pia_sin = 100 * 2;
    const pia_con = 100 * 4;
    expect(b.pia_sin).toBe(pia_sin);
    expect(b.pia_con).toBe(pia_con);
    expect(b.uia).toBe(pia_con - pia_sin);
  });
});
