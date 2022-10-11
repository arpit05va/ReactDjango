from django.db import models

# Create your models here.


class Crops(models.Model):
    name = models.CharField('Name', max_length=100)
    desc = models.TextField(blank=True)
    type = models.CharField('Type', max_length=50)
    user = models.IntegerField("Created By", blank=False, default=1)

    def __str__(self):
        return self.name
