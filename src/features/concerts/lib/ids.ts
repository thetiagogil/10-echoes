export type ConcertIdParamResult =
  | {
      ok: true;
      id: number;
    }
  | {
      ok: false;
    };

export function parseConcertIdParam(value: string): ConcertIdParamResult {
  if (!/^[1-9]\d*$/.test(value)) {
    return { ok: false };
  }

  const id = Number(value);

  return Number.isSafeInteger(id) ? { ok: true, id } : { ok: false };
}
