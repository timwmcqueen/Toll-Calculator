import java.util.Scanner;

/**
 * Original Java console exercise preserved for project history.
 * The modern React + TypeScript implementation lives under src/.
 */
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter time of travel (HH:MM in 24 hour format): ");
        String time = scanner.nextLine();
        int colon = time.indexOf(":");
        int hour = Integer.parseInt(time.substring(0, colon));

        System.out.print("Enter type of day (0 - weekday, 1 - weekend/holiday): ");
        int typeOfDay = scanner.nextInt();

        double toll;
        if (typeOfDay == 0) {
            if (hour < 6) toll = 1.55;
            else if (hour < 10) toll = 4.65;
            else if (hour < 18) toll = 2.35;
            else toll = 1.55;
        } else {
            if (hour < 8) toll = 1.55;
            else if (hour < 12) toll = 3.05;
            else if (hour < 16) toll = 3.45;
            else if (hour < 19) toll = 3.60;
            else if (hour < 22) toll = 3.05;
            else toll = 1.55;
        }

        System.out.printf("Toll is $%.2f%n", toll);
    }
}
