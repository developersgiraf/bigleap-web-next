
'use client';
import { useEffect } from 'react';

export default function CounterJs() {
    useEffect(() => {
        // Wait for component to be fully mounted
        const initializeCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            const duration = 2000;

            // Function to animate a single counter
            const animateCounter = (counter) => {
                const target = +counter.getAttribute('data-target');
                const symbol = counter.getAttribute('data-symbol') || '';
                let start = 0;
                const increment = target / (duration / 16);

                // Reset counter to 0 before animation
                counter.textContent = '0' + symbol;

                // Add CSS class for styling
                counter.classList.add('counter_stat-number__animating');

                function updateCounter() {
                    start += increment;
                    if (start < target) {
                        counter.textContent = Math.floor(start) + symbol;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + symbol;
                        counter.classList.remove('counter_stat-number__animating');
                        counter.classList.add('counter_stat-number__completed');
                    }
                }
                updateCounter();
            };

            // Use Intersection Observer to trigger animation when section comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log('Counter section is visible, starting animation...');
                        const countersInView = entry.target.querySelectorAll('.stat-number');
                        
                        if (countersInView.length === 0) {
                            console.warn('No counters found in the section');
                            return;
                        }

                        countersInView.forEach((counter, index) => {
                            // Only animate if not already animated
                            if (!counter.dataset.animated) {
                                counter.dataset.animated = 'true';
                                // Small delay for staggered animation effect
                                const delay = index * 200;
                                setTimeout(() => {
                                    animateCounter(counter);
                                }, delay);
                            }
                        });
                    } else {
                        // Optional: Reset animation when section is out of view (uncomment if you want re-triggering)
                        // const countersInView = entry.target.querySelectorAll('.stat-number');
                        // countersInView.forEach(counter => {
                        //     counter.dataset.animated = 'false';
                        //     counter.textContent = '0' + (counter.getAttribute('data-symbol') || '');
                        //     counter.classList.remove('counter_stat-number__animating', 'counter_stat-number__completed');
                        // });
                    }
                });
            }, {
                threshold: 0.2, // Trigger when 20% of the section is visible
                rootMargin: '0px 0px -100px 0px' // Start animation a bit before the section is fully visible
            });

            // Look for the stats section with multiple possible selectors
            const statsSection = document.querySelector('[class*="stats-section"]') || 
                               document.querySelector('.stats-section') ||
                               document.querySelector('section[class*="stats"]');
            
            if (statsSection) {
                console.log('Stats section found, observing...');
                observer.observe(statsSection);
            } else {
                console.warn('Stats section not found');
                // Fallback: try to find it in a short delay
                setTimeout(() => {
                    const fallbackSection = document.querySelector('[class*="stats-section"]');
                    if (fallbackSection) {
                        console.log('Stats section found on retry, observing...');
                        observer.observe(fallbackSection);
                    }
                }, 1000);
            }

            // Cleanup observer on component unmount
            return () => {
                if (statsSection) {
                    observer.unobserve(statsSection);
                }
            };
        };

        // Initialize with a small delay to ensure DOM is ready
        const timeoutId = setTimeout(initializeCounters, 100);

        // Cleanup timeout on unmount
        return () => {
            clearTimeout(timeoutId);
        };
    }, []); // Empty dependency array means this runs once on mount

    return null; // This component doesn't render anything visible
}