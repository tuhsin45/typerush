const express = require('express');
const router = express.Router();

const textSnippets = [
  "The art of programming extends far beyond simply writing code that works. It involves understanding complex systems, designing elegant solutions, and creating software that not only functions correctly but also maintains readability and efficiency. Modern software development requires a deep understanding of various programming paradigms, from object-oriented programming to functional programming approaches. Developers must consider factors such as scalability, maintainability, and performance optimization when crafting their solutions. The collaborative nature of software development means that code must be written not just for computers to execute, but for other humans to understand, modify, and extend. This philosophy drives the adoption of clean code principles, comprehensive documentation, and standardized coding practices. Furthermore, the rapidly evolving technology landscape demands continuous learning and adaptation. New frameworks, libraries, and tools emerge regularly, each promising to solve existing problems more effectively. Successful programmers embrace this constant change, viewing it as an opportunity for growth rather than a burden. They understand that mastering the fundamentals of computer science provides a solid foundation upon which to build expertise in specific technologies. Whether working on web applications, mobile apps, or enterprise systems, the core principles of good software design remain consistent across all domains.",
  
  "Artificial intelligence has transformed from a futuristic concept into an integral part of our daily lives. Machine learning algorithms power recommendation systems that suggest movies we might enjoy, products we might want to purchase, and content that aligns with our interests. Natural language processing enables virtual assistants to understand and respond to human speech, while computer vision allows machines to interpret and analyze visual information. The healthcare industry has particularly benefited from AI advancements, with diagnostic tools that can detect diseases earlier and more accurately than traditional methods. Financial institutions leverage AI for fraud detection, risk assessment, and algorithmic trading. However, the rapid advancement of artificial intelligence also raises important ethical considerations. Questions about privacy, bias in algorithmic decision-making, and the potential displacement of human workers require careful consideration and proactive solutions. Researchers and policymakers work together to establish guidelines and regulations that ensure AI development remains beneficial to society as a whole. The future of artificial intelligence holds immense promise, with potential applications in climate change mitigation, space exploration, and scientific discovery. As we continue to push the boundaries of what machines can accomplish, we must remain mindful of our responsibility to develop these technologies thoughtfully and ethically.",
  
  "The evolution of web development has been remarkable over the past three decades. What began as simple static HTML pages has transformed into sophisticated, interactive applications that rival desktop software in functionality and user experience. The introduction of CSS revolutionized web design by separating content from presentation, allowing developers to create visually appealing layouts while maintaining semantic markup. JavaScript emerged as the language of the web, enabling dynamic interactions and real-time updates without requiring page refreshes. The advent of AJAX further enhanced user experience by allowing asynchronous data exchange between client and server. Modern web development frameworks like React, Angular, and Vue.js have abstracted away much of the complexity involved in building interactive user interfaces. These tools provide developers with powerful abstractions for managing application state, handling user interactions, and organizing code in maintainable ways. On the backend, Node.js brought JavaScript to server-side development, enabling full-stack JavaScript applications. Database technologies have also evolved, with NoSQL solutions like MongoDB offering flexible schema designs that complement modern application architectures. Progressive Web Apps blur the line between web and native applications, providing offline functionality and native-like experiences. As web technologies continue to advance, developers must stay current with emerging standards, best practices, and tools that shape the future of digital experiences.",
  
  "Climate change represents one of the most pressing challenges facing humanity in the twenty-first century. Rising global temperatures, melting ice caps, and extreme weather events are clear indicators of our planet's changing climate system. The scientific consensus overwhelmingly supports the conclusion that human activities, particularly the emission of greenhouse gases from fossil fuel combustion, are the primary drivers of current climate change. The consequences extend far beyond environmental concerns, affecting economic stability, food security, and social equity worldwide. Coastal communities face the threat of rising sea levels, while agricultural regions grapple with changing precipitation patterns and increasing temperatures that affect crop yields. The transition to renewable energy sources has become not just an environmental imperative but an economic opportunity. Solar and wind technologies have achieved cost parity with traditional fossil fuels in many markets, driving unprecedented growth in clean energy installations. Electric vehicles are rapidly gaining market share, supported by improving battery technology and expanding charging infrastructure. Governments worldwide are implementing policies to reduce carbon emissions, including carbon pricing mechanisms, renewable energy mandates, and energy efficiency standards. Individual actions, while important, must be complemented by systemic changes in how we produce energy, design cities, and organize economic activities. The path forward requires unprecedented global cooperation, technological innovation, and commitment to sustainable development practices that can support human prosperity while preserving our planet for future generations.",
  
  "The digital revolution has fundamentally altered how we communicate, work, and access information. Social media platforms have created new forms of community and connection, enabling people to maintain relationships across vast distances and discover others who share their interests and values. However, these same technologies have also introduced new challenges related to privacy, misinformation, and the quality of human interaction. The democratization of information through the internet has empowered individuals with unprecedented access to knowledge, educational resources, and opportunities for self-improvement. Online learning platforms have made high-quality education accessible to people regardless of their geographic location or economic circumstances. Remote work, accelerated by global events, has reshaped traditional employment models and enabled greater flexibility in how and where people work. Digital transformation has also revolutionized industries from healthcare to finance, enabling new business models and improving efficiency in countless processes. Telemedicine allows patients to receive medical care from their homes, while digital banking has made financial services more accessible and convenient. E-commerce has transformed retail, providing consumers with unprecedented choice and convenience while enabling small businesses to reach global markets. As we navigate this digital landscape, we must address challenges related to digital literacy, cybersecurity, and ensuring that technological benefits are distributed equitably across all segments of society. The future will likely bring even more transformative technologies, requiring continued adaptation and thoughtful consideration of their societal implications."
];

router.get('/random', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * textSnippets.length);
    const selectedText = textSnippets[randomIndex];
    
    res.json({
      text: selectedText,
      length: selectedText.length,
      wordCount: selectedText.split(' ').length
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/all', (req, res) => {
  try {
    res.json({
      texts: textSnippets.map((text, index) => ({
        id: index,
        text: text,
        length: text.length,
        wordCount: text.split(' ').length
      }))
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
