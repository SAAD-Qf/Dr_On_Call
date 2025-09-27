import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Mock AI responses based on keywords
    let response = '';
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('headache') || lowerMessage.includes('head')) {
      response = "I understand you're experiencing headaches. This could be due to various factors like stress, dehydration, or lack of sleep. For persistent headaches, I'd recommend consulting with one of our doctors for a proper evaluation.";
    } else if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      response = "Fever can be a sign of infection or other conditions. Please monitor your temperature and consider seeing a doctor if it persists above 100.4°F (38°C) or if you have other concerning symptoms.";
    } else if (lowerMessage.includes('cough') || lowerMessage.includes('cold')) {
      response = "Cough and cold symptoms are common. Stay hydrated, rest well, and monitor your symptoms. If they worsen or persist for more than a week, please consult with a healthcare professional.";
    } else if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart')) {
      response = "Chest pain should always be taken seriously. I strongly recommend speaking with a doctor immediately, especially if you're experiencing severe pain, shortness of breath, or other cardiac symptoms.";
    } else if (lowerMessage.includes('stomach') || lowerMessage.includes('nausea') || lowerMessage.includes('vomit')) {
      response = "Stomach issues can range from simple indigestion to more serious conditions. Stay hydrated and avoid solid foods temporarily. If symptoms persist or worsen, please consult a doctor.";
    } else {
      response = "Thank you for sharing your symptoms with me. While I can provide general guidance, it's important to get a proper medical evaluation. I recommend booking a consultation with one of our qualified doctors for personalized care.";
    }

    // Add doctor recommendation for certain symptoms
    if (lowerMessage.includes('chest pain') || lowerMessage.includes('severe') || lowerMessage.includes('emergency')) {
      response += "\n\nThis seems like it requires immediate medical attention. Would you like me to help you find an available doctor right away?";
    } else {
      response += "\n\nWould you like me to help you find a suitable doctor for a consultation?";
    }

    return NextResponse.json({ 
      success: true, 
      response 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}