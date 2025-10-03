import { NextResponse } from 'next/server';
import { db } from '../../../../firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';

export async function POST(request) {
  try {
    const backupData = await request.json();

    // Validate the backup data structure
    if (!backupData.WebsiteDatas) {
      return NextResponse.json(
        { error: 'Invalid backup data: Missing WebsiteDatas collection' },
        { status: 400 }
      );
    }

    const websiteDataRef = collection(db, 'WebsiteDatas');

    // Get current documents to delete them first
    const currentSnapshot = await getDocs(websiteDataRef);
    
    // Use batched writes for better performance and atomicity
    const batch = writeBatch(db);
    
    // Delete existing documents
    currentSnapshot.forEach((document) => {
      const docRef = doc(db, 'WebsiteDatas', document.id);
      batch.delete(docRef);
    });

    // Add new documents from backup
    const backupEntries = Object.entries(backupData.WebsiteDatas);
    let updatedCount = 0;

    for (const [docId, docData] of backupEntries) {
      // Remove the 'id' field if it exists to avoid duplication
      const { id, ...dataWithoutId } = docData;
      
      const docRef = doc(db, 'WebsiteDatas', docId);
      batch.set(docRef, dataWithoutId);
      updatedCount++;
    }

    // Commit the batch
    await batch.commit();

    // Clear any cache if needed
    try {
      await fetch('/api/cache/clear', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pattern: 'services*' })
      });
    } catch (cacheError) {
      console.log('Cache clear failed (non-critical):', cacheError);
    }

    return NextResponse.json({
      success: true,
      message: 'Database restored successfully',
      updatedCount,
      deletedCount: currentSnapshot.size,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error restoring database:', error);
    return NextResponse.json(
      { 
        error: 'Failed to restore database',
        details: error.message 
      },
      { status: 500 }
    );
  }
}