$(function () {
        let currency = 'mxn';
        let pricingTerm = 'monthly';
        let medicTier = 0;
        var monthly = document.getElementsByName("Mensual");
        var yearly = document.getElementsByName("Anual");
        const initialMedics = 5;
        const planPricing = {
            basic: {
                monthly: {
                    mxn: 499.00,
                    usd: 29.00,
                },

                yearly: {
                    mxn: 5389,
                    usd: 449,

                    monthly: {
                        mxn: 449,
                        usd: 26.00
                    }
                }
            },

            plus: {
                monthly: {
                    mxn: 699,
                    usd: 39.00,
                },

                yearly: {
                    mxn: 7549,
                    usd: 629,

                    monthly: {
                        mxn: 629,
                        usd: 36.00
                    }
                }
            },

            clinic: {
                monthly: [
                    {
                        mxn: 649,
                        usd: 36.00,
                    },
                    {
                        mxn: 599,
                        usd: 33.00,
                    },
                    {
                        mxn: 549,
                        usd: 30.00,
                    },
                    {
                        mxn: 499,
                        usd: 27.00,
                    },
                    {
                        mxn: 449,
                        usd: 25.00,
                    },
                ],

                yearly: [
                    {
                        mxn: 7009,
                        usd: 384,

                        monthly: {
                            mxn: 584,
                            usd: 32
                        }
                    },
                    {
                        mxn: 6469,
                        usd: 348,

                        monthly: {
                            mxn: 539,
                            usd: 29
                        }
                    },
                    {
                        mxn: 5929,
                        usd: 324,

                        monthly: {
                            mxn: 494,
                            usd: 27
                        }
                    },
                    {
                        mxn: 5389,
                        usd: 288,

                        monthly: {
                            mxn: 449,
                            usd: 24
                        }
                    },
                    {
                        mxn: 4849,
                        usd: 264,

                        monthly: {
                            mxn: 404,
                            usd: 22
                        }
                    },
                ],
            }
        };
        const storagePricing = {
            '100gb': {
                mxn: 29,
                usd: 1.59
            },
            '200gb': {
                mxn: 49,
                usd: 2.79
            },
            '500gb': {
                mxn: 99,
                usd: 5.49
            },
            '1tb': {
                mxn: 139,
                usd: 7.79
            },
            '2tb': {
                mxn: 179,
                usd: 9.99
            },
        };

        $('.currency-toggle a').on('click', changeCurrency);
        $('.switch .checkbox').on('click', changePricingTerm);
        $('#amount-medics').on('change', changeSelectedMedics);
        $('#amount-medics').on('input', changeSelectedMedics);
        $(document).ready(() => {
            setInitialPricing();
            setInitialMedics();
        });

        function setInitialPricing() {
            const pricingTermChecked = $('.slider.round')[0].checked;
            pricingTerm = pricingTermChecked ? 'yearly' : 'monthly';

            updatePricingFields();
        }

        function setInitialMedics() {
            $('.amount-medics-displayer').html(initialMedics);
            $('#amount-medics').val(initialMedics);

        }

        function updateMedicTier(amount) {
            if (amount <= 5) {
                medicTier = 0;
            } else if (amount >= 6 && amount <= 10) {
                medicTier = 1;
            } else if (amount >= 11 && amount <= 15) {
                medicTier = 2;
            } else if (amount >= 16 && amount <= 20) {
                medicTier = 3;
            } else {
                medicTier = 4;
            }
        }

        function changeSelectedMedics(event) {
            const newMedicAmount = Number($(event.target).val());
            $('.amount-medics-displayer').html(newMedicAmount);
            updateMedicTier(newMedicAmount);
            updatePlanPricing('clinic');
        }

        function changePricingTerm(event) {
            //  event.preventDefault();
            pricingTerm = event.target.checked ? 'yearly' : 'monthly';
            updatePricingFields('duration');
            $('.anual').toggleClass("pricing-item-color");
            $('.monthly').toggleClass("pricing-item-color");
        }

        function changeCurrency(event) {
            currency = event.target.dataset.currency;
            $('.currency-toggle .selected').removeClass('selected');
            $('.currency-toggle .' + currency).toggleClass('selected');

            event.preventDefault();
            updateCurrencyNameFields();
            updatePricingFields('currency');
        }

        function updateCurrencyNameFields() {
            let $plansCurrency = $('.price-wrapper .currency');
            let $storageCurrency = $('.storage-wrapper tr .currency');

            $plansCurrency.each(i => {
                $($plansCurrency[i]).html(currency.toUpperCase());
            });

            $storageCurrency.each(i => {
                $($storageCurrency[i]).html(currency.toUpperCase());
            });
        }

        function updatePricingFields(changeType) {
            const plans = ['basic', 'plus', 'clinic'];

            for (const plan of plans) {
                updatePlanPricing(plan);
            }

            if (changeType === 'currency') {
                updateStoragePricing();
            }

            if (changeType === 'duration') {

            }
        }

        function updateStoragePricing() {
            for (const tier in storagePricing) {
                let newPrice = storagePricing[tier][currency];
                $(`.${tier} .amount`).html(`$${newPrice}`);
            }
        }

        function updatePlanPricing(plan) {
            let monthlyPrice;
            let yearlyPrice;

            if (pricingTerm === 'yearly') {
                if (plan === 'clinic') {
                    yearlyPrice = planPricing[plan].yearly[medicTier][currency];
                    monthlyPrice = planPricing[plan].yearly[medicTier].monthly[currency];
                } else {
                    yearlyPrice = planPricing[plan].yearly[currency];
                    monthlyPrice = planPricing[plan].yearly.monthly[currency];
                }
            } else {
                if (plan === 'clinic') {
                    monthlyPrice = planPricing[plan].monthly[medicTier][currency];
                    yearlyPrice = monthlyPrice * 12;
                } else {
                    monthlyPrice = planPricing[plan].monthly[currency];
                    yearlyPrice = monthlyPrice * 12;
                }
            }

            $(`.${plan} .price.monthly .odometer`).html(monthlyPrice);
            $(`.${plan} .price.yearly .odometer`).html(yearlyPrice);
        }
    }
);