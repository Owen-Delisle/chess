class FancyAnimatedCheckmateAlert {
    private readonly message: string;
    private readonly width: number;
    private readonly height: number;
  
    constructor(message: string, width: number = 50, height: number = 10) {
      this.message = message;
      this.width = width;
      this.height = height;
    }
  
    showAlert(): void {
      this.printTopBorder();
      this.printMessage();
      this.printBottomBorder();
  
      // Simulate closing animation
      setTimeout(() => {
        console.clear();
      }, 3000);
    }
  
    private printTopBorder(): void {
      console.log(`%c${'─'.repeat(this.width)}`, 'color: red;');
    }
  
    private printMessage(): void {
      const padding = ' '.repeat(Math.floor((this.width - this.message.length) / 2));
      console.log(`%c│${padding}${this.message}${padding}│`, 'color: red;');
    }
  
    private printBottomBorder(): void {
      console.log(`%c${'─'.repeat(this.width)}`, 'color: red;');
    }
  }
  
  // Example usage:
  export const animatedCheckmateAlert = new FancyAnimatedCheckmateAlert('Checkmate! You win!');
  