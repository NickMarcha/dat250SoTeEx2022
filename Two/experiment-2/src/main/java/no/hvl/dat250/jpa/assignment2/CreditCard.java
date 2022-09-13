package no.hvl.dat250.jpa.assignment2;

import lombok.Setter;

import javax.persistence.*;
import java.util.PrimitiveIterator;

@Entity
@Setter
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int number;

    private int limit;

    private int balance;

    @OneToOne
    private Pincode pincode;

    @ManyToOne(targetEntity = Bank.class)
    private Bank owningBank;

    public Integer getNumber() {
        // TODO: implement method!
        return number;
    }

    public Integer getBalance() {
        // TODO: implement method!
        return balance;
    }

    public Integer getLimit() {
        // TODO: implement method!
        return limit;
    }

    public Pincode getPincode() {
        // TODO: implement method!
        return pincode;
    }

    public Bank getOwningBank() {
        // TODO: implement method!
        return owningBank;
    }
}
