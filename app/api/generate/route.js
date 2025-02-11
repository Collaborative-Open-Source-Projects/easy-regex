import { NextResponse } from 'next/server';
import { buildRegex } from '../../../utils/regexGenerator';

export async function POST(req) {
    try {
        const body = await req.json();
        const { patterns } = body;

        if (!patterns || !Array.isArray(patterns)) {
            return NextResponse.json(
                { error: 'Patterns array is required' },
                { status: 400 },
            );
        }

        const regexPattern = buildRegex(patterns);

        return NextResponse.json({ regex: regexPattern });
    } catch (error) {
        console.error('Error processing the request:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
