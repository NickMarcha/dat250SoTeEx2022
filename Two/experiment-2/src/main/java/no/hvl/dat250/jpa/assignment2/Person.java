package no.hvl.dat250.jpa.assignment2;

import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Setter
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "ADDRESS_PERSON",
            joinColumns = @JoinColumn(name = "OWNERS_ID"),
            inverseJoinColumns = @JoinColumn(name = "ADRESSES_ID")
    )
    private Collection<Address> addresses;

    @OneToMany
    private Collection<CreditCard> creditCards;

    public String getName() {
        // TODO: implement method!
        return name;
    }

    public Collection<Address> getAddresses() {
        // TODO: implement method!
        return addresses;
    }

    public Collection<CreditCard> getCreditCards() {
        // TODO: implement method!
        return creditCards;
    }
}
